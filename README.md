
# GitGenome

> **Mapping the DNA of Developers**

GitGenome is an interactive web app that analyzes GitHub user profiles to reveal their unique "developer genome" and classify them into playful archetypes. By examining public repositories, commit patterns, and coding behaviors, GitGenome visualizes your coding style and development journey as a living, animated experience.

## Features

- **GitHub Profile Analysis**: Enter any GitHub username to analyze their public repositories and activity.
- **Developer Genome**: Quantifies four core behavioral axes—Exploration, Discipline, Experimentation, Consistency.
- **Archetype Detection**: Classifies developers into one of four archetypes:
	- **Night Owl**: Steady late-night coder
	- **Framework Collector**: Explorer of new tools and frameworks
	- **Chaos Builder**: Rapid experimenter, thrives in creative chaos
	- **Builder Beaver**: Disciplined, long-term project maintainer
- **Visual Scenes & Creatures**: Each archetype is brought to life with custom animated scenes and mascot creatures.
- **Mutation & Trait Detection**: Highlights unique coding habits and patterns (e.g., "Console.log Addict").
- **Shareable Reports**: Generate a fun, shareable summary of your developer genome.

## How It Works

1. **Data Collection**: Fetches public GitHub user and repo data via the GitHub API.
2. **Normalization**: Cleans and standardizes repository data for analysis.
3. **Metrics Extraction**: Calculates stats like repo count, language diversity, commit frequency, and more.
4. **Genome Calculation**: Maps metrics to four axes: Exploration, Discipline, Experimentation, Consistency.
5. **Archetype Detection**: Runs detectors to classify the user into an archetype based on their genome and activity.
6. **Traits & Mutations**: Identifies notable coding behaviors and habits.
7. **Visualization**: Presents results as interactive scenes and panels.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/gitgenome.git
cd gitgenome
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Developer Archetypes

| Archetype            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| Night Owl            | Steady, consistent coder, often active late at night             |
| Framework Collector  | Loves exploring new frameworks, high repo and language diversity  |
| Chaos Builder        | Rapid experimenter, thrives in creative chaos                    |
| Builder Beaver       | Disciplined, builds and maintains substantial long-term projects  |

### Genome Axes

- **Exploration**: How much you try new technologies
- **Discipline**: Project longevity and follow-through
- **Experimentation**: Frequency of new ideas and repos
- **Consistency**: Regularity and steadiness of contributions

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Credits

- Built with [Next.js](https://nextjs.org), [React](https://react.dev), and [Framer Motion](https://www.framer.com/motion/)
- GitHub API for data
- Fonts: Geist, Patrick Hand, Caveat

---

_What’s your GitGenome?_ 🧬
