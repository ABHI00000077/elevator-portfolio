export type FloorPoster = {
  type?: "normal" | "codeforces";

  id?: string;
  image?: string;

  title: string;
  description: string;

  category?: string;
  tech?: string[];

  github?: string;
  demo?: string;
};

export type FloorLayout = "profile" | "grid" | "contact";

export type FloorContent = {
  title: string;
  layout: FloorLayout;
  posters: FloorPoster[];
};

export const floorContent: Record<number, FloorContent> = {
  0: {
    title: "About Me",
    layout: "profile",
    posters: [
      {
        image: "images/image.jpeg",
        title: "HI, I AM ABHINAV",

        category: "Introduction",
        tech: ["IIT Ropar", "Software Developer", "Game Development Enthusiast"],
        description:
          "Third Year B.Tech student at IIT Ropar with a foundation in programming, software development, and game animation.",
      },
    ],
  },

  1: {
    title: "Skills",
    layout: "grid",
    posters: [
      {
        image:"images/1a.png",
        title: "C++ & Python",
        category: "Programming Language",
        tech: ["STL", "Algorithms", "Data Structures","Deep Learning"],
        description:
          "Primary language for competitive programming, algorithms, and performance-oriented development.",
      },
      {
        
        image:"images/1b.png",
        title: "C#",
        category: "Programming Language",
        tech: ["Game Development using Unity 3D libraries"],
        description:
          "Used for scripting, and quick prototyping in game development.",
      },
      {
        
        image:"images/1c.png",
        title: "M E R N Stack & Three.js",
        category: "Web Develeopent",
        tech: ["TypeScript", "UI Design","Database Management","Backend","3D UI","React Three Fibre"],
        description:
          "My main frameworks for building modern interactive web applications.",
      },
      {
        
        image:"images/1d.png",
        title: "Blender & Asperite",
        category: "3D & 2D Animation",
        tech: ["Character Design", "Animation", "UI"],
        description:
          "Used for immersive 3D aniamtions and character design for games.",
      },
    ],
  },

  2: {
    title: "Projects",
    layout: "grid",
    posters: [
      {
        id: "PRJ-001",
        title: "SOUL UNBOUND",
        category: "Game Development",
        tech: ["Unity", "C#", "Blender"],
        github: "#",
        demo: "#",
        description:
          " Designed and developed a Puzzle game in Unity using C#, centered around shadow-based interaction mechanics with a 4 member team. Built modular level components, reusable scripts, and state-based gameplay logic to ensure scalability, intuitive puzzle design, and consistent progression in difficulty across levels Emphasis was placed on creating intuitive puzzles, maintaining gameplay logic consistency, and designing levels with a smooth and engaging difficulty curve.",},
      {
        id: "PRJ-002",
        title: "Pet-Friendly City",
        category: "Web Development",
        tech: ["React", "AI", "Frontend"],
        github: "#",
        demo: "#",
        description:
          "An interactive platform helping users discover pet-friendly services and locations through a modern experience.",
      },
      {
        id: "PRJ-003",
        title: "Elevator Portfolio",
        category: "3D Web Experience",
        tech: ["React", "Three.js", "TypeScript"],
        github: "#",
        demo: "#",
        description:
          "A cinematic portfolio website designed around an elevator travelling through portfolio floors.",
      },
      {
        id: "PRJ-004",
        title: "More Projects",
        category: "Future Work",
        tech: ["Innovation", "Experiments"],
        github: "#",
        demo: "#",
        description:
          "Additional personal and collaborative projects will be showcased here.",
      },
    ],
  },

  3: {
    title: "Experience",
    layout: "grid",
    posters: [
      {
        title: "Team Projects",
        category: "Collaboration",
        tech: ["Git", "Communication"],
        description:
          "Worked in teams to plan, build, and deliver software projects effectively.",
      },
      {
        title: "Hackathons",
        category: "Competitions",
        tech: ["Rapid Development", "Problem Solving"],
        description:
          "Built solutions under strict deadlines while focusing on innovation and execution.",
      },
      {
        title: "Position of Responsibilities",
        category: "Management",
        tech: ["Teamwork", "Planning"],
        description:
          "Contributed to software-focused initiatives and collaborative project development.",
      },
      {
        type:"codeforces",
        image:"images/codeforces.png",
        title: "Codeforces",
        category: "Competitive Programming",
        tech: ["Algorithms", "Data Structures"],
        description:
          "Consistent participation in competitive programming contests and problem-solving challenges.",
      },
    ],
  },

  4: {
    title: "Behind the Scene",
  layout: "grid",

  posters: [
    {
      title: "The Inspiration",

      category: "Concept",

      tech: [
        "Bruno Simon",
        "Interactive Design",
        "Creative UX",
      ],

      description:
        "Inspired by Bruno Simon's portfolio and the idea that a portfolio should be explored rather than simply read.",
    },

    {
      title: "Tech Stack",

      category: "Development",

      tech: [
        "React",
        "TypeScript",
        "Three.js",
        "React Three Fiber",
        "Drei",
        "Framer Motion",
      ],

      description:
        "Built using modern web technologies to combine immersive 3D experiences with a responsive and maintainable frontend architecture.",
    },

    {
      title: "Construction Site",

      category: "Credits",

      tech: [
        "Sketchfab Asset",
        "3D Environment",
        "Model Credits",
      ],

      description:
        "The construction site environment was sourced from Sketchfab and adapted to support the construction-themed narrative of this portfolio.",
    },

    {
      title: "Building The Experience",

      category: "Process",

      tech: [
        "Storytelling",
        "Interaction Design",
        "User Experience",
      ],

      description:
        "The elevator system, animated posters, blueprint modals, floor transitions, and environment design were created to transform a portfolio into an interactive journey.",
    },
  ],
  },

  5: {
    title: "Contact",
    layout: "contact",
    posters: [
      {
        title: "Let's Connect",
        category: "Contact Directory",
        tech: [
          "Email: abhinav@email.com",
          "LinkedIn: linkedin.com/in/abhinav",
          "GitHub: github.com/abhinav",
          "Resume: Available on request",
        ],
        description:
          "Reach out for opportunities, collaborations, or discussions. You can connect with me through email, view my work on GitHub, find me on LinkedIn, or download my resume for a quick overview.",
      },
    ],
  },
};