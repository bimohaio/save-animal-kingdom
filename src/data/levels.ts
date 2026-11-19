import type { Level } from "../types/game";

export const levels: Level[] = [
  {
    id: 1,
    name: "Mystic Rainforest",
    subtitle: "The whispering jungle",
    emoji: "🌴",
    theme: "forest",
    location: "South America",
    animal: "🐅",
    animalName: "Bengal tiger",
    crystal: "🌿",
    description: "A young tiger is lost among the ancient trees. Follow the clues and help it find a safe path home.",
    challenge: {
      type: "quiz",
      prompt: "What do tigers need most to survive in the wild?",
      description: "Choose the best answer to unlock the forest gate.",
      options: [
        { id: "a", text: "A healthy habitat with food and water" },
        { id: "b", text: "A swimming pool and toys" },
        { id: "c", text: "A city with many buildings" }
      ],
      answer: "a",
      success: "Excellent! Protected forests give tigers space, food and shelter.",
      hint: "Think about the things every wild animal needs to live."
    }
  },
  {
    id: 2,
    name: "Ocean of Secrets",
    subtitle: "The blue underwater world",
    emoji: "🐠",
    theme: "ocean",
    location: "Pacific Ocean",
    animal: "🐢",
    animalName: "Sea turtle",
    crystal: "💧",
    description: "Plastic waste is blocking the turtle's route. Sort the objects to clear a safe path through the reef.",
    challenge: {
      type: "sorting",
      prompt: "Help clean the ocean!",
      description: "Choose the items that belong in recycling. The other items should be reduced or reused.",
      items: [
        { id: "bottle", label: "Plastic bottle", category: "recycle" },
        { id: "can", label: "Aluminium can", category: "recycle" },
        { id: "bag", label: "Single-use plastic bag", category: "reduce" },
        { id: "straw", label: "Plastic straw", category: "reduce" }
      ],
      success: "The water is clearer! The sea turtle can swim safely again.",
      hint: "Some materials can be recycled. The best choice is to avoid single-use plastic when possible."
    }
  },
  {
    id: 3,
    name: "Frozen Kingdom",
    subtitle: "The icy mystery",
    emoji: "❄️",
    theme: "ice",
    location: "The Arctic",
    animal: "🐻‍❄️",
    animalName: "Polar bear",
    crystal: "🧊",
    description: "The ice is melting and a polar bear is stranded. Discover what is making the Arctic warmer.",
    challenge: {
      type: "quiz",
      prompt: "Which action can help slow climate change?",
      description: "Choose one action that helps reduce greenhouse gas emissions.",
      options: [
        { id: "a", text: "Waste electricity every day" },
        { id: "b", text: "Save energy and use cleaner transport" },
        { id: "c", text: "Burn more fossil fuels" }
      ],
      answer: "b",
      success: "You got it! Saving energy and cleaner transport can help reduce emissions.",
      hint: "Choose the action that uses less energy and creates less pollution."
    }
  },
  {
    id: 4,
    name: "Lost Savanna",
    subtitle: "The golden grasslands",
    emoji: "🦒",
    theme: "savanna",
    location: "African Savanna",
    animal: "🐘",
    animalName: "African elephant",
    crystal: "☀️",
    description: "The elephant herd has lost its way. Match each animal to the clue that describes its home.",
    challenge: {
      type: "matching",
      prompt: "Match the animal to its habitat!",
      description: "Tap one animal, then tap the habitat clue that fits it.",
      pairs: [
        { left: "🐘 Elephant", right: "Grasslands and forests" },
        { left: "🐬 Dolphin", right: "Ocean and seas" },
        { left: "🐧 Penguin", right: "Cold southern coasts" }
      ],
      success: "Perfect matches! The elephant herd has found its way to a safe waterhole.",
      hint: "Think about where each animal naturally finds food, water and shelter."
    }
  },
  {
    id: 5,
    name: "Ancient Wildlife Sanctuary",
    subtitle: "The final hidden key",
    emoji: "✨",
    theme: "sanctuary",
    location: "The hidden sanctuary",
    animal: "🦧",
    animalName: "Orangutan",
    crystal: "💚",
    description: "The last crystal is guarded by an ancient sanctuary. Answer one final question to unlock the portal.",
    challenge: {
      type: "quiz",
      prompt: "Why should we protect endangered animals?",
      description: "Choose the answer that best explains why biodiversity matters.",
      options: [
        { id: "a", text: "Every species has a role in a healthy ecosystem" },
        { id: "b", text: "Only large animals are important" },
        { id: "c", text: "Extinction makes habitats healthier" }
      ],
      answer: "a",
      success: "Wonderful! Every species is part of the balance of nature.",
      hint: "Think about how plants, animals and habitats depend on one another."
    }
  }
];