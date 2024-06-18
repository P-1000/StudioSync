-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(255)
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS public.tracks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMP,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES public.users(id)
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    creator_id INTEGER NOT NULL,
    editor_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (track_id) REFERENCES public.tracks(id),
    FOREIGN KEY (creator_id) REFERENCES public.users(id),
    UNIQUE (track_id, editor_email)
);

-- Create metadata_drafts table
CREATE TABLE IF NOT EXISTS public.metadata_drafts (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    editor_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    thumbnail_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (track_id) REFERENCES public.tracks(id),
    FOREIGN KEY (editor_id) REFERENCES public.users(id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Create project_memberships table
CREATE TABLE IF NOT EXISTS public.project_memberships (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    member_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (track_id) REFERENCES public.tracks(id)
);

-- Create video_drafts table
CREATE TABLE IF NOT EXISTS public.video_drafts (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL,
    editor_id INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (track_id) REFERENCES public.tracks(id),
    FOREIGN KEY (editor_id) REFERENCES public.users(id)
);
