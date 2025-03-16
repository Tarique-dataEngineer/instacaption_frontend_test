import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import instaC_logo from "./instaC_logo.png";
import copy_icon from "./copy_icon.png";
import david from "./david.png";




export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  instaC_logo,
  copy_icon,
  david

  
};

export const stepsData = [
  {
    title: "Upload Your Image",
    description: "Start by uploading your perfect image.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will generate caption for your image, best caption in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Copy & Share",
    description:
      "Instantly copy your caption or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Ananya Sharma",
    role: "Social Media Influencer",
    stars: 5,
    text: "Instacaptions.ai has completely changed how I create Instagram captions! The AI understands my pictures so well that the captions feel natural and engaging. Saves me so much time!",
  },
  {
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Rohan Mehta",
    role: "Travel Blogger",
    stars: 4.8,
    text: "I used to spend hours thinking of the right caption for my travel shots. Now, this AI generates perfect captions in seconds, matching the emotions and scenery in my photos!",
  },
  {
    image: profile_img_3,
    name: "Priya Desai",
    role: "Photographer",
    stars: 5,
    text: "The AI not only recognizes objects in my photos but also understands emotions! It creates captions that truly resonate with the mood of my pictures. Highly recommended!",
  },
  {
    image: profile_img_1,
    name: "Arjun Verma",
    role: "Content Creator",
    stars: 4.9,
    text: "From witty one-liners to deep, meaningful quotes, Instacaptions.ai delivers the best captions based on the image context. It's like having a personal caption writer!",
  },
];


export const plans = [
  {
    id: "Basic",
    price: 19,
    credits: 100,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 39,
    credits: 500,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 79,
    credits: 1000,
    desc: "Best for enterprise use.",
  },
];
