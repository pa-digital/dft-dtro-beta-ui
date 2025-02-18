import classNames from "classnames";
import React from "react";
import styles from "./typography.component.module.css";

export enum TypographyType {
  MainHeading = "mainHeading",
  SubHeading = "subHeading",
  Description = "description",
  SubDescription = "subDescription",
  Label = "label",
  Email = "email",
  Validation = "validation",
}

interface TypographyComponentProps {
  type?: TypographyType;
  content: string;
  className?: string;
  href?: string;
}

const TextComponent: React.FC<TypographyComponentProps> = ({
  type = TypographyType.Description,
  content,
  className = "",
  href,
}) => {
  const isLink = type === TypographyType.Email;

  return isLink ? (
    <a
      href={href ?? `mailto:${content}`}
      className={classNames(styles.email, className)}
    >
      {content}
    </a>
  ) : (
    <p
      className={classNames(className, {
        [styles.mainHeading]: type === TypographyType.MainHeading,
        [styles.subHeading]: type === TypographyType.SubHeading,
        [styles.description]: type === TypographyType.Description,
        [styles.subDescription]: type === TypographyType.SubDescription,
        [styles.label]: type === TypographyType.Label,
        [styles.validation]: type === TypographyType.Validation,
      })}
    >
      {content}
    </p>
  );
};

export default TextComponent;
