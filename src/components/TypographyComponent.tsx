import styles from "./TypographyComponent.module.css";

interface TypographyComponentProps {
    variant?: "heading" | "description" | "info";
    content: string;
    className?: string;
    style?: React.CSSProperties;
  }
  
  // Maps the custom names to html tages
  const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
    heading: "h1",
    description: "p",
    info: "span",
  };
  
  const TextComponent: React.FC<TypographyComponentProps> = ({
    variant = "description",
    content,
    className = "",
    style = {},
  }) => {
    const Tag = tagMap[variant] || "p"; // Fallback to <p> if invalid
    const finalClassName = `${styles[variant]} ${className}`.trim();
    return <Tag className={finalClassName}>{content}</Tag>;
  };
  
  export default TextComponent;