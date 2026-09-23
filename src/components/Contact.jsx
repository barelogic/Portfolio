import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import { Reveal } from './motion/Effects';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('https://formspree.io/f/xbdazrwq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Portfolio Contact from ${formData.name}`,
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad">
      <Reveal>
        <div className="flex items-center justify-between border-b rule pb-4">
          <span className="label-mono text-smoke">(05) — Contact</span>
          <span className="label-mono hidden items-center gap-2 text-smoke sm:flex">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            Avg. reply — 24h
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display-giant mt-6 text-[14vw] lg:text-[9.5vw]">
          Let&apos;s work
          <br />
          <span className="text-outline">together</span>
          <a href="mailto:venkateshr.work@gmail.com" className="text-accent transition-transform hover:rotate-12" style={{ display: 'inline-block' }}>↗</a>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <a
            href="mailto:venkateshr.work@gmail.com"
            className="link-underline font-display text-xl font-bold uppercase tracking-tight sm:text-2xl"
          >
            venkateshr.work@gmail.com
          </a>
          <div className="mt-8">
            {[
              ['GitHub', 'https://github.com/barelogic'],
              ['LinkedIn', 'https://www.linkedin.com/in/venkatesh-rathinasabapathy-671491322/'],
              ['Instagram', 'https://instagram.com/yourprofile'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-t rule py-4 last:border-b"
              >
                <span className="font-display text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-accent">
                  {label}
                </span>
                <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="name" className="label-mono text-smoke">Your name *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Cooper"
                className="field-line mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="label-mono text-smoke">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@studio.com"
                className="field-line mt-1"
              />
            </div>
            <div>
              <label htmlFor="message" className="label-mono text-smoke">Project details *</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about timeline, scope, goals…"
                className="field-line mt-1 resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="btn-pill w-full justify-center !py-4 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : (<><FaPaperPlane /> Send message</>)}
            </motion.button>
            {submitStatus === 'success' && (
              <p className="font-medium">Message sent — I&apos;ll get back to you soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="font-medium text-accent-deep">Failed to send. Please email me directly.</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
