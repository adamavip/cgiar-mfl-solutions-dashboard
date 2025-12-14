# CGIAR Multifunctional Landscapes Solutions Dashboard

<div align="center">
  <img src="public/multifunctional-web-logo.jpg" alt="CGIAR Multifunctional Landscapes Logo" width="400" />
</div>

A comprehensive web application for exploring and analyzing CGIAR's multifunctional landscape innovations and solutions. This dashboard provides interactive visualizations, AI-powered insights, and detailed information about innovations across multiple countries and scales.

## Features

### 🏠 Home Page

- **Hero Section**: Overview of the CGIAR Multifunctional Landscapes program
- **Impact Statistics**: Key metrics and achievements
- **Interactive 3D Voxel Garden**: Visual representation of landscape systems
- **Quick Navigation**: Easy access to key sections

### 🌍 Where We Work

- **Interactive Map**: Visual representation of countries where CGIAR operates
- **Country Cards**: Detailed information about each country
- **Region Filtering**: Filter countries by region (Africa, Asia, Latin America)
- **Hover Interactions**: Interactive highlighting between map pins and country cards

### 💡 Innovation/Solutions Page

- **AI-Powered Summary**: Automated insights using Google Gemini AI
- **Interactive Charts**:
  - Innovation types distribution (Pie Chart)
  - Top countries by innovation count (Vertical Bar Chart)
  - Implementation scale distribution (Horizontal Bar Chart)
- **Advanced Filtering**: Filter by:
  - Centre(s) involved
  - Type of innovations/solutions
  - Scale
  - Climate Classification
- **Data Table**: Sortable and filterable table with all innovation records
- **Export Functionality**: Download filtered data as CSV or Excel
- **AI Chatbot**: Interactive assistant for querying innovation data

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Charts**: amCharts 5
- **3D Graphics**: Three.js
- **AI Integration**: Google Gemini API (Gemini 2.5 Flash)
- **Data Export**: xlsx library for Excel export

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Google Gemini API Key** (for AI features)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd cgiar-mfl-solutions-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
cgiar-mfl-solutions-dashboard/
├── components/
│   ├── Assistant.tsx          # AI chatbot component
│   ├── Footer.tsx              # Footer component
│   ├── HomeContent.tsx         # Home page content
│   ├── Innovation.tsx         # Main innovation page
│   ├── InnovationGraphs.tsx   # Chart visualizations
│   ├── Navbar.tsx             # Navigation bar
│   ├── VoxelGarden.tsx        # 3D voxel garden component
│   └── WhereWeWork.tsx        # Countries page
├── services/
│   └── geminiService.ts       # Google Gemini API integration
├── public/
│   ├── multifunctional-web-logo.jpg  # Program logo
│   └── voxel-scene.html              # 3D scene HTML
├── App.tsx                    # Main app component
├── constants.ts               # Application constants
├── types.ts                   # TypeScript type definitions
├── index.css                  # Global styles
└── Descriptions_of_innovations.json  # Innovation data (NDJSON format)
```

## Data Source

The application uses `Descriptions_of_innovations.json`, a newline-delimited JSON (NDJSON) file containing innovation records with the following key fields:

- **Innovation**: Name of the innovation/technology/tool
- **Type of Innovation / Technology/ Tool**: Category of innovation
- **Scale**: Implementation scale (Plot, Farm, Community, Landscape, Multiscale, National)
- **Climate Classification**: Climate zone classification
- **Country**: Country where the innovation is implemented
- **Description**: Detailed description of the innovation
- **Centre (s) involved**: CGIAR centers involved in the innovation

## Features in Detail

### AI-Powered Insights

- **Automated Summaries**: The AI analyzes filtered data and provides contextual insights
- **Interactive Chatbot**: Ask questions about innovations, trends, and patterns
- Powered by Google Gemini 2.5 Flash model

### Data Visualization

- **Responsive Charts**: All charts are interactive and responsive
- **Real-time Filtering**: Charts update automatically when filters change
- **Export Options**: Download filtered data in CSV or Excel format

### Interactive Map

- **Country Visualization**: See where CGIAR operates globally
- **Region Filtering**: Filter by geographic regions
- **Hover Effects**: Interactive highlighting for better UX

## Environment Variables

| Variable         | Description                           | Required |
| ---------------- | ------------------------------------- | -------- |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes      |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Apache-2.0

## Contributing

This is a CGIAR project. For contributions, please contact the project maintainers.

## Links

- **CGIAR 2030 Research and Innovation Strategy**: [View Document](https://cgspace.cgiar.org/items/f5fb41f0-6ea8-4583-b96d-b72a3fc96187)

---

**CGIAR Multifunctional Landscapes Program** - Transforming food, land, and water systems in a climate crisis.
