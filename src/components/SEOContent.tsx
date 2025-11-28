import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SEOContentProps {
  children: ReactNode;
}

export const SEOContent = ({ children }: SEOContentProps) => {
  return (
    <section className="mt-16 max-w-4xl mx-auto prose prose-slate dark:prose-invert">
      <div className="bg-card rounded-xl p-8 border border-border space-y-6">
        {children}
      </div>
    </section>
  );
};

interface RelatedToolProps {
  name: string;
  link: string;
}

export const RelatedTools = ({ tools }: { tools: RelatedToolProps[] }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-foreground">Related Tools</h3>
      <ul className="space-y-2">
        {tools.map((tool, index) => (
          <li key={index}>
            <Link 
              to={tool.link}
              className="text-primary hover:underline font-medium"
            >
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};