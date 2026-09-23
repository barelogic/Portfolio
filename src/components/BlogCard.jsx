import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ post, index }) => {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col border-t-2 border-ink pt-5"
    >
      <div className="label-mono flex items-center justify-between text-smoke">
        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="display-lg mt-4 text-2xl normal-case leading-tight tracking-normal transition-colors group-hover:text-accent md:text-[1.7rem]">
        {post.title}
      </h3>
      <p className="mt-3 flex-grow leading-relaxed text-ink/70">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="label-mono text-smoke">
              #{tag}
            </span>
          ))}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
          <FaArrowRight className="-rotate-45 text-sm" />
        </span>
      </div>
    </motion.a>
  );
};

export default BlogCard;
