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
      className="group relative bg-card rounded-lg p-6 transition-all duration-200 hover:-translate-y-1 shadow-card hover:shadow-card-hover border border-border hover:border-primary/50 overflow-hidden"
    >
      <div 
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
          highlight ? 'bg-gradient-highlight' : 'bg-gradient-card'
        }`}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-card transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  );
};

export default ToolCard;
