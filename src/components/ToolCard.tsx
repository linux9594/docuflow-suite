import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  highlight?: boolean;
}

const ToolCard = ({ title, description, icon: Icon, link, highlight = false }: ToolCardProps) => {
  return (
    <Link 
      to={link} 
      className="group relative bg-card rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-card-hover border border-border hover:border-primary overflow-hidden"
    >
      <div 
        className={`absolute top-0 left-0 w-full h-1.5 transition-all duration-300 ${
          highlight ? 'bg-accent' : 'bg-primary'
        } group-hover:h-2`}
      />
      <div 
        className={`w-15 h-15 rounded-xl flex items-center justify-center mb-6 shadow-button ${
          highlight ? 'bg-gradient-highlight' : 'bg-gradient-card'
        }`}
      >
        <Icon className="w-9 h-9 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Link>
  );
};

export default ToolCard;
