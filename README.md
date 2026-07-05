# ഐഡിയ ഉണ്ടോ? — IdeaUndo

> Got a wild app idea? Drop it here. No login, no judgment, just ideas.

IdeaUndo (Malayalam: "Is there an idea?") is a simple, open idea-sharing platform for curious minds. Anyone can post an idea, view others' ideas, like them, comment on them, and share them — no account required.

---

## Features

- Post an idea anonymously or with your name (no login needed)
- Structure ideas as a **Problem + Solution** for clarity
- Add tags to categorize ideas
- Like ideas (one like per device)
- Comment on ideas in real time
- Share any idea via a copyable link
- Responsive grid layout — works on mobile and desktop
- Real-time updates across all devices via Firestore

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Database | Firebase Firestore |
| Hosting | Vercel |

Everything used here is on a **free tier** — no paid services required.

---

## Project Structure

```
ideaundo/
├── app/
│   ├── page.tsx              # Homepage — idea feed
│   ├── layout.tsx            # Root layout
│   ├── globals.css
│   └── idea/[id]/page.tsx    # Individual idea detail + comments
├── src/
│   ├── components/
│   │   ├── IdeaCard.tsx      # Card shown in the feed
│   │   ├── IdeaForm.tsx      # Post a new idea form
│   │   ├── CommentSection.tsx
│   │   └── ShareButton.tsx
│   └── lib/
│       └── firebase.js       # Firebase initialization
├── .env.local                # Firebase config (not committed)
└── next.config.ts
```

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore enabled

### 1. Clone the repo
```bash
git clone https://github.com/AnnaRoseDolfy2163/ideaundo.git
cd ideaundo
npm install
```

### 2. Set up environment variables
Create a `.env.local` file in the project root:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_value
```
Get these values from the Firebase Console → Project Settings → Your Apps → Config.

> Ask the project owner to add you as a Firebase project member (Editor role) so you can access the config yourself.

### 3. Run locally
```bash
npm run dev
```
Open `http://localhost:3000`

---

## Contributing

1. Get added as a collaborator on GitHub (ask the repo owner)
2. Clone the repo and follow the local setup above
3. Create a new branch for your changes:
```bash
git checkout -b your-feature-name
```
4. Make your changes, commit, and push:
```bash
git add .
git commit -m "describe what you changed"
git push origin your-feature-name
```
5. Open a Pull Request on GitHub for review before merging into `main`

---

## Firestore Data Model

**`ideas` collection:**
```
{
  title: string
  problem: string
  solution: string
  tags: string[]
  authorName: string | null
  likes: number
  createdAt: Timestamp
}
```

**`ideas/{ideaId}/comments` subcollection:**
```
{
  text: string
  authorName: string | null
  createdAt: Timestamp
}
```

---

## Deployment

The app is deployed on Vercel. Every push to `main` triggers an automatic redeploy.

To deploy your own instance:
1. Push to GitHub
2. Import the repo on vercel.com
3. Add the six `NEXT_PUBLIC_FIREBASE_*` environment variables in Vercel's project settings
4. Deploy

---

## Team

Built by a group of CSE students — because why not build something fun while learning?