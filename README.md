# EventHub360

EventHub360 is a full-stack Quotation & Proposal Management Platform built for luxury event planners, hospitality venues, and B2B corporate events.

## Tech Stack
* **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
* **Backend**: NestJS, Prisma, PostgreSQL
* **Features**: Dynamic Quoting, Live Margin Calculation, Pricing Workflows, Approval Tiers

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node)
- PostgreSQL database (or Supabase connection string)

### 1. Database Setup
EventHub360 uses Prisma for ORM with a PostgreSQL database. When you clone this repository, you only get the schema (the blueprint). You must set up your own local database to run it.

1. Ensure your PostgreSQL database is installed and running on your computer.
2. Open pgAdmin (or your terminal) and create a brand new, empty database (e.g., named `eventhub_db`).
3. In the `backend` folder, create a `.env` file (this is not tracked by git for security) and add a connection string that points to your local database credentials:
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/eventhub_db?schema=public"
   ```
4. Open a terminal in the `backend` folder and push the schema to your fresh database to generate all the tables:
   ```bash
   npx prisma db push
   ```

### 2. Backend Setup (NestJS)

Open a new terminal and navigate to the backend directory:
```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client based on schema
npx prisma generate

# Apply migrations and push schema to database
npx prisma db push

# (Optional) Run seed scripts if you have them configured
npx prisma db seed

# Start the NestJS backend server (Runs on port 3000 by default)
npm run start:dev
```

### 3. Frontend Setup (React/Vite)

Open a second terminal window and navigate to the frontend directory:
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server (Runs on port 5173 by default)
npm run dev
```

### 4. Running the Application
Once both servers are running:
1. Open your browser and navigate to `http://localhost:5173`
2. You can access the Quotation Builder, Approvals Workflow, and Dashboard from the sidebar.

---

## 🛠 Features Explained

* **Live Quotation Builder**: Add items, adjust quantities, set discounts, and see real-time profitability.
* **Margin Safety Protocols**: Backend calculations enforce minimum profit margins. Quotes falling below 15% are automatically escalated from "Standard" to "High Priority" for management review.
* **Metadata Saving**: Draft configurations are securely stored as JSON metadata natively so you never lose your progress.
