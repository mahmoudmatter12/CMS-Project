export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export const teamMembersData: TeamMember[] = [
  {
    id: 1,
    name: "Mahmoud Gamal",
    role: "Lead AI Researcher",
    imageUrl: "https://via.placeholder.com/300/92c9d1/000000?text=Alice+W.",
    bio: "Alice is a pioneer in natural language processing and machine learning, with over 15 years of experience driving innovation in AI.",
    expertise: ["NLP", "Machine Learning", "Deep Learning", "Python"],
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Mohamed Ibrahim",
    role: "Senior Software Engineer",
    imageUrl: "https://via.placeholder.com/300/7dd3fc/000000?text=Bob+B.",
    bio: "Bob is a full-stack wizard, passionate about building scalable and robust software solutions. He excels in cloud architectures and microservices.",
    expertise: ["React", "Node.js", "AWS", "Microservices", "DevOps"],
    linkedin: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Ahmed Khairy",
    role: "UX/UI Design Lead",
    imageUrl: "https://via.placeholder.com/300/fca5a5/000000?text=Carol+D.",
    bio: "Carol crafts intuitive and engaging user experiences. Her design philosophy centers around user-centricity and aesthetic elegance.",
    expertise: ["User Research", "UI Design", "Prototyping", "Figma", "Accessibility"],
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 4,
    name: "Hanan Hany",
    role: "Data Scientist",
    imageUrl: "https://via.placeholder.com/300/bef264/000000?text=David+C.",
    bio: "David transforms complex datasets into actionable insights. He specializes in predictive modeling and data visualization.",
    expertise: ["Statistics", "R", "Python", "Tableau", "Big Data"],
    github: "#",
  },
  {
    id: 5,
    name: "Banan Wael",
    role: "Data Scientist",
    imageUrl: "https://via.placeholder.com/300/bef264/000000?text=David+C.",
    bio: "David transforms complex datasets into actionable insights. He specializes in predictive modeling and data visualization.",
    expertise: ["Statistics", "R", "Python", "Tableau", "Big Data"],
    github: "#",
  },
];