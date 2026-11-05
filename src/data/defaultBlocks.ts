import { Block, BlockType } from '../types';

export interface BlockBlueprint {
  type: BlockType;
  label: string;
  description: string;
  iconName: string;
  createDefault: () => Block;
}

export const BLOCK_BLUEPRINTS: BlockBlueprint[] = [
  {
    type: 'hero',
    label: 'Hero Section',
    description: 'High-impact headline, subheadline, call-to-action button, and hero background.',
    iconName: 'LayoutTemplate',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'hero',
      title: 'Build Exceptional Digital Experiences',
      subtitle: 'Effortlessly manage, design, and publish high-performance web pages with our modern drag-and-drop CMS.',
      buttonText: 'Get Started Now',
      buttonUrl: '#contact',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      styles: {
        backgroundColor: '#0f172a',
        textColor: '#ffffff',
        padding: 'xl',
        align: 'center',
      },
    }),
  },
  {
    type: 'features',
    label: 'Feature Grid',
    description: 'Showcase product or service highlights in 3 attractive columns with icons.',
    iconName: 'Grid3X3',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'features',
      title: 'Everything You Need To Succeed',
      subtitle: 'Engineered for speed, collaboration, and high conversion rates.',
      items: [
        {
          id: 'feat_1',
          title: 'Drag & Drop Builder',
          description: 'Visually assemble responsive blocks with real-time viewport previews.',
          icon: 'Sparkles',
        },
        {
          id: 'feat_2',
          title: 'Collaborative Review',
          description: 'Role-based approval pipelines ensure editorial quality before going live.',
          icon: 'Users',
        },
        {
          id: 'feat_3',
          title: 'Built-in SEO & Analytics',
          description: 'Real-time keyword scoring, OpenGraph cards, and privacy-first page metrics.',
          icon: 'TrendingUp',
        },
      ],
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#0f172a',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
  {
    type: 'content',
    label: 'Rich Content Block',
    description: 'Structured editorial text, headings, and formatted narrative paragraphs.',
    iconName: 'FileText',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'content',
      title: 'Our Mission & Architectural Philosophy',
      subtitle: 'Designed to bridge the gap between creative teams and engineering rigor.',
      content: `In today's fast-moving web landscape, content creators need autonomy without sacrificing brand consistency or page performance. Our CMS architecture separates presentation from data modeling, allowing dynamic template re-use, robust role validation, and automated publishing pipelines.

Whether you are launching a global product update, publishing long-form investigative journalism, or testing marketing landing pages, every asset is tracked through complete revision histories and collaborative reviews.`,
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#334155',
        padding: 'md',
        align: 'left',
      },
    }),
  },
  {
    type: 'stats',
    label: 'Metrics & Stats Counter',
    description: 'Highlight key achievements, user numbers, and enterprise benchmarks.',
    iconName: 'BarChart2',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'stats',
      title: 'Proven at Enterprise Scale',
      subtitle: 'Powering web experiences across thousands of modern teams worldwide.',
      items: [
        { id: 'stat_1', title: '99.99%', description: 'Uptime SLA' },
        { id: 'stat_2', title: '10x Faster', description: 'Publishing Cycles' },
        { id: 'stat_3', title: '2.5M+', description: 'Monthly Visitors' },
        { id: 'stat_4', title: '150+', description: 'Global CDN Nodes' },
      ],
      styles: {
        backgroundColor: '#4f46e5',
        textColor: '#ffffff',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
  {
    type: 'image_banner',
    label: 'Media Showcase Banner',
    description: 'Full-width visual banner or product screenshot with styled caption.',
    iconName: 'Image',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'image_banner',
      title: 'Modern Intuitive Interface',
      subtitle: 'Preview desktop, tablet, and mobile layouts in a single fluid workspace.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        padding: 'md',
        align: 'center',
      },
    }),
  },
  {
    type: 'testimonials',
    label: 'Customer Testimonials',
    description: 'Social proof cards with client quotes, avatars, ratings, and roles.',
    iconName: 'MessageSquareQuote',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'testimonials',
      title: 'Loved by Content Teams & Marketing Leaders',
      subtitle: 'See what creative directors and publishers say about their workflow transformation.',
      items: [
        {
          id: 'test_1',
          title: 'Alex Rivera',
          subtitle: 'VP of Marketing at Horizon Inc',
          description: '“The approval workflows eliminated publishing bottlenecks. Our editorial team produces twice as many campaigns with total confidence.”',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        {
          id: 'test_2',
          title: 'Marcus Vance',
          subtitle: 'Lead Developer at WebCraft Studio',
          description: '“The clean separation of blocks and instant Vercel deployment makes our client handoffs seamless. No broken styles ever.”',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        },
      ],
      styles: {
        backgroundColor: '#f1f5f9',
        textColor: '#0f172a',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
  {
    type: 'cta',
    label: 'Call To Action',
    description: 'Conversion-focused banner with prominent headline, badge, and action button.',
    iconName: 'Megaphone',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'cta',
      title: 'Ready to Transform Your Content Management?',
      subtitle: 'Join thousands of creators building fast, collaborative, and beautiful sites today.',
      buttonText: 'Start Publishing Free',
      buttonUrl: '#signup',
      styles: {
        backgroundColor: '#0f172a',
        textColor: '#ffffff',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
  {
    type: 'faq',
    label: 'Interactive FAQ Accordion',
    description: 'Collapsible frequently asked questions with instant accordion expand/collapse.',
    iconName: 'HelpCircle',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Got questions? We have clear answers.',
      items: [
        {
          id: 'faq_1',
          title: 'Can editors publish pages without Admin approval?',
          description: 'No, our role-based workflow requires Editors and Contributors to submit drafts for Admin review, guaranteeing quality control.',
        },
        {
          id: 'faq_2',
          title: 'How does the Local Storage persistence work?',
          description: 'All your pages, drafts, users, SEO metadata, and analytics are synced to your browser localStorage with instant reload support.',
        },
        {
          id: 'faq_3',
          title: 'Can this project be deployed directly to Vercel?',
          description: 'Yes! The project includes complete vercel.json rewrite rules and zero-config static export ready for production.',
        },
      ],
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
  {
    type: 'contact',
    label: 'Contact & Inquiry Form',
    description: 'Clean lead generation form with name, email, subject, and message inputs.',
    iconName: 'Mail',
    createDefault: () => ({
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      type: 'contact',
      title: 'Get In Touch With Our Team',
      subtitle: 'Have a customized requirement or enterprise inquiry? Send us a note below.',
      buttonText: 'Send Inquiry',
      styles: {
        backgroundColor: '#f8fafc',
        textColor: '#0f172a',
        padding: 'lg',
        align: 'center',
      },
    }),
  },
];
