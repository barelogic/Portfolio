import BlogCard from './BlogCard';
import blogPostsData from '../data/blogPosts.json';
import { SectionHeading, Reveal } from './motion/Effects';

const BlogPosts = () => {
  return (
    <section id="journal" className="section-pad">
      <SectionHeading index="04" label="Journal" title="Notes" sub={`(${String(blogPostsData.length).padStart(2, '0')}) articles`} />
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {blogPostsData.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default BlogPosts;
