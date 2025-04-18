import { RadioButtonOption } from "../../components/radio-button/radio-button.component";

export const regulationTypeItems: RadioButtonOption[] = [
    { value: 0, title: "Banned movement" },
    { value: 1, title: "Dimension" },
    { value: 2, title: "Mandatory direction" },
    { value: 3, title: "Movement order" },
    { value: 4, title: "Non-order" },
    { value: 5, title: "Miscellaneous" },
];

export const troTypeItems: RadioButtonOption[] = [
    { value: 0, title: "Permanent" },
    { value: 1, title: "Temporary" },
    { value: 2, title: "Experimental" },
    { value: 3, title: "Special event" },
];

export const errorTypeItems: RadioButtonOption[] = [
    { value: 0, title: "Dates" },
    { value: 1, title: "TRO title" },
    { value: 2, title: "Geometry" },
    { value: 3, title: "Regulation type" },
    { value: 4, title: "TRA" },
    { value: 5, title: "Other" },
];