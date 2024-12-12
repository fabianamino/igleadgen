# LeadGen - Social Media Growth Platform 

![LeadGen Banner](public/og.png)

## Overview

LeadGen is a powerful social media growth and analytics platform designed to help content creators and businesses optimize their social media presence. Built with Next.js 14, TypeScript, and Tailwind CSS, it offers a modern, responsive dashboard with advanced features for tracking engagement, analyzing trends, and managing social media growth.

## Features

- **Analytics Dashboard**
  - Real-time engagement metrics
  - Growth tracking and visualization
  - Performance analytics
  
- **User Management**
  - User discovery and targeting
  - Engagement tracking
  - Automated interactions
  
- **Hashtag Analysis**
  - Trending hashtags discovery
  - Category-based filtering
  - Engagement rate analysis
  
- **Profile Management**
  - Customizable user profiles
  - Achievement tracking
  - Growth milestones

## Tech Stack

- **Frontend Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** Prisma with PostgreSQL
- **UI Components:** shadcn/ui
- **Icons:** Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/leadgen.git
   cd leadgen
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in the `.env` file.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Visit `http://localhost:3000` to see the application.

## Screenshots

### Dashboard
![Dashboard](public/screenshots/dashboard.png)

### Analytics
![Analytics](public/screenshots/analytics.png)

### Profile
![Profile](public/screenshots/profile.png)

## Security

- Secure authentication with NextAuth.js
- Data encryption
- Rate limiting
- Input validation
- CSRF protection

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Prisma](https://www.prisma.io/)

## Support

For support, email support@leadgen.com or join our [Discord community](https://discord.gg/leadgen).

---

Made with ❤️ by Fabian Amino