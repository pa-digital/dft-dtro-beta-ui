import styles from "./typography.component.module.css";

export enum TypographyVariant {
  MainHeading = "mainHeading",
  SubHeading = "subHeading",
  Description = "description"
}

interface TypographyComponentProps {
    variant?: TypographyVariant;
    content: string;
    className?: string;
    style?: React.CSSProperties;
  }
  
  
  const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
    [TypographyVariant.MainHeading]: "h1",
    [TypographyVariant.SubHeading]: "h2",
    [TypographyVariant.Description]: "p",
  };
  
  const TextComponent: React.FC<TypographyComponentProps> = ({
    variant = TypographyVariant.Description,
    content,
    className = "",
    style = {},
  }) => {
    const Tag = tagMap[variant] || "p";
    const finalClassName = `${styles[variant]} ${className}`.trim();
    return <Tag className={finalClassName}>{content}</Tag>;
  };

  export default TextComponent;