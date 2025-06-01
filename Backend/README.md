 
# ReachX Digital Solutions - Backend

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a `.env` file in the root directory** and add:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Run the server**
   ```bash
   npm start
   ```

4. **API Endpoint**
   - Submit contact form: `POST /api/contact`

## Tech Stack
- Node.js + Express.js (Backend)
- MongoDB (Database)
- CORS for frontend-backend communication
