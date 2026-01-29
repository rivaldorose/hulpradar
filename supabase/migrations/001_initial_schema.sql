-- HulpRadar Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: organisations
CREATE TABLE IF NOT EXISTS organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,

  -- Contact
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,

  -- Location
  address TEXT,
  postcode TEXT,
  gemeente TEXT NOT NULL,
  province TEXT,

  -- Settings
  contact_preference TEXT DEFAULT 'email' CHECK (contact_preference IN ('email', 'dashboard')),
  max_capacity INTEGER DEFAULT 10,
  current_capacity INTEGER DEFAULT 0,
  estimated_wait_days INTEGER DEFAULT 14,

  -- White Label
  white_label_enabled BOOLEAN DEFAULT false,
  white_label_primary_color TEXT,
  white_label_domain TEXT,

  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),
  kvk_number TEXT,
  nvvk_member BOOLEAN DEFAULT false,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for location search
CREATE INDEX IF NOT EXISTS idx_organisations_gemeente ON organisations(gemeente);
CREATE INDEX IF NOT EXISTS idx_organisations_postcode ON organisations(postcode);
CREATE INDEX IF NOT EXISTS idx_organisations_verified ON organisations(is_verified, is_active);

-- Table: organisation_users (for dashboard access)
CREATE TABLE IF NOT EXISTS organisation_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organisation_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_organisation_users_user ON organisation_users(user_id);
CREATE INDEX IF NOT EXISTS idx_organisation_users_org ON organisation_users(organisation_id);

-- Table: help_requests
CREATE TABLE IF NOT EXISTS help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Hulpzoekende Info (geen account nodig)
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  contact_preference TEXT DEFAULT 'email' CHECK (contact_preference IN ('email', 'sms', 'app')),

  -- Location
  postcode TEXT NOT NULL,
  gemeente TEXT NOT NULL,

  -- Source
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'konsensi_app', 'white_label')),
  source_organisation_id UUID REFERENCES organisations(id),
  konsensi_user_id UUID,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'matching',
    'matched',
    'accepted',
    'in_progress',
    'completed',
    'cancelled'
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  matched_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Index for matching
CREATE INDEX IF NOT EXISTS idx_help_requests_gemeente ON help_requests(gemeente);
CREATE INDEX IF NOT EXISTS idx_help_requests_status ON help_requests(status);
CREATE INDEX IF NOT EXISTS idx_help_requests_created ON help_requests(created_at DESC);

-- Table: matches
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  help_request_id UUID REFERENCES help_requests(id) ON DELETE CASCADE,
  organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'accepted',
    'rejected',
    'expired'
  )),

  -- Priority (1 = highest)
  priority INTEGER DEFAULT 1,

  -- Response tracking
  notified_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  response_note TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),

  UNIQUE(help_request_id, organisation_id)
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_matches_help_request ON matches(help_request_id);
CREATE INDEX IF NOT EXISTS idx_matches_organisation ON matches(organisation_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_expires ON matches(expires_at);

-- Table: notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Recipient
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('help_seeker', 'organisation')),
  recipient_email TEXT,
  recipient_phone TEXT,
  organisation_id UUID REFERENCES organisations(id),
  help_request_id UUID REFERENCES help_requests(id),

  -- Content
  type TEXT NOT NULL CHECK (type IN (
    'match_found',
    'organisation_accepted',
    'new_help_request',
    'request_reminder',
    'request_expired'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Delivery
  channel TEXT DEFAULT 'email' CHECK (channel IN ('email', 'sms', 'app', 'dashboard')),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_type, organisation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_help_request ON notifications(help_request_id);

-- Table: conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE UNIQUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,

  sender_type TEXT NOT NULL CHECK (sender_type IN ('help_seeker', 'organisation')),
  sender_name TEXT,
  content TEXT NOT NULL,

  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisation_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Organisations: Public read for verified, authenticated write for owners
CREATE POLICY "Public can view verified organisations"
  ON organisations FOR SELECT
  USING (is_verified = true AND is_active = true);

CREATE POLICY "Organisation users can view their org"
  ON organisations FOR SELECT
  USING (id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Organisation owners can update"
  ON organisations FOR UPDATE
  USING (id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- Organisation Users policies
CREATE POLICY "Users can view their own memberships"
  ON organisation_users FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Owners can manage team members"
  ON organisation_users FOR ALL
  USING (organisation_id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid() AND role = 'owner'
  ));

-- Help Requests: Anyone can create, only involved parties can view
CREATE POLICY "Anyone can create help request"
  ON help_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Help seekers can view own requests by email"
  ON help_requests FOR SELECT
  USING (
    email IS NOT NULL AND
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Organisations can view matched requests"
  ON help_requests FOR SELECT
  USING (id IN (
    SELECT help_request_id FROM matches m
    JOIN organisation_users ou ON m.organisation_id = ou.organisation_id
    WHERE ou.user_id = auth.uid()
  ));

-- Matches: Involved parties only
CREATE POLICY "Organisations can view their matches"
  ON matches FOR SELECT
  USING (organisation_id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Organisations can update their matches"
  ON matches FOR UPDATE
  USING (organisation_id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid()
  ));

-- Notifications policies
CREATE POLICY "Organisations can view their notifications"
  ON notifications FOR SELECT
  USING (organisation_id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid()
  ));

CREATE POLICY "Organisations can update notification read status"
  ON notifications FOR UPDATE
  USING (organisation_id IN (
    SELECT organisation_id FROM organisation_users
    WHERE user_id = auth.uid()
  ));

-- Conversations policies
CREATE POLICY "Organisations can view their conversations"
  ON conversations FOR SELECT
  USING (match_id IN (
    SELECT id FROM matches m
    JOIN organisation_users ou ON m.organisation_id = ou.organisation_id
    WHERE ou.user_id = auth.uid()
  ));

-- Messages policies
CREATE POLICY "Organisations can view messages in their conversations"
  ON messages FOR SELECT
  USING (conversation_id IN (
    SELECT c.id FROM conversations c
    JOIN matches m ON c.match_id = m.id
    JOIN organisation_users ou ON m.organisation_id = ou.organisation_id
    WHERE ou.user_id = auth.uid()
  ));

CREATE POLICY "Organisations can send messages"
  ON messages FOR INSERT
  WITH CHECK (conversation_id IN (
    SELECT c.id FROM conversations c
    JOIN matches m ON c.match_id = m.id
    JOIN organisation_users ou ON m.organisation_id = ou.organisation_id
    WHERE ou.user_id = auth.uid()
  ));

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_organisations_updated_at
  BEFORE UPDATE ON organisations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_help_requests_updated_at
  BEFORE UPDATE ON help_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Demo organisations for testing)
-- ============================================

INSERT INTO organisations (name, slug, email, gemeente, postcode, description, is_verified, is_active, estimated_wait_days, max_capacity, nvvk_member) VALUES
  ('Schuldhulp Amsterdam', 'schuldhulp-amsterdam', 'info@schuldhulpamsterdam.nl', 'Amsterdam', '1012AB', 'Professionele schuldhulpverlening in Amsterdam en omgeving.', true, true, 7, 20, true),
  ('Financieel Fit Rotterdam', 'financieel-fit-rotterdam', 'contact@financieelfitrotterdam.nl', 'Rotterdam', '3011AA', 'Wij helpen je weer financieel op de rit.', true, true, 14, 15, true),
  ('Budget Buddies Utrecht', 'budget-buddies-utrecht', 'hello@budgetbuddies.nl', 'Utrecht', '3511AA', 'Laagdrempelige hulp bij geldzaken voor jongeren.', true, true, 5, 10, false),
  ('SchuldVrij Den Haag', 'schuldvrij-denhaag', 'info@schuldvrijdenhaag.nl', 'Den Haag', '2511AA', 'Samen werken aan een schuldenvrije toekomst.', true, true, 10, 12, true),
  ('Geldwijzer Eindhoven', 'geldwijzer-eindhoven', 'hulp@geldwijzer-eindhoven.nl', 'Eindhoven', '5611AA', 'Praktische hulp bij schulden en financiële administratie.', true, true, 21, 8, false)
ON CONFLICT (slug) DO NOTHING;
