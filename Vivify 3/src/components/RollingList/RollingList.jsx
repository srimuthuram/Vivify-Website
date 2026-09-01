import "./RollingList.css";
import { motion } from "framer-motion";

function RollingTextItem({ item, index }) {
  return (
    <motion.div
      className="rolling-item"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Rolling text */}
      <div className="rolling-item__text">
        <div className="rolling-item__content">
          {/* State 1: Normal */}
          <div className="rolling-item__state">
            <h2 className="rolling-item__title">
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover (Italic + Color) */}
          <div className="rolling-item__state">
            <h2 className="rolling-item__title rolling-item__title--hover">
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Category Label */}
      <span className="rolling-item__category">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div className="rolling-item__image">
        <div className="rolling-item__image-inner">
          <img
            src={item.src}
            alt={item.alt}
            className="rolling-item__img"
          />
          <div className="rolling-item__overlay" />
        </div>
      </div>
    </motion.div>
  );
}

function RollingTextList() {
  const items = [
    {
      id: 1,
      title: "Discovery & Planning",
      category: "Research",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60",
      alt: "Team discovering insights",
    },
    {
      id: 2,
      title: "UI/UX Architecture",
      category: "Experience",
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60",
      alt: "Design collaboration",
    },
    {
      id: 3,
      title: "Agile Development",
      category: "Engineering",
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
      alt: "Developers coding",
    },
    {
      id: 4,
      title: "Rigorous QA",
      category: "Testing",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
      alt: "Quality assurance testing",
    },
    {
      id: 5,
      title: "Deploy & Support",
      category: "Launch",
      src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&auto=format&fit=crop&q=60",
      alt: "Product launch",
    },
  ];

  return (
    <div className="rolling-list mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-4 py-12">
      <h3 className="rolling-list__label mb-8 text-sm font-bold uppercase tracking-widest text-neutral-500">
        Process
      </h3>
      <div className="w-full flex flex-col">
        {items.map((item, index) => (
          <RollingTextItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default RollingTextList;
