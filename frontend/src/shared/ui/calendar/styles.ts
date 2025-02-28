import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    label: "flex grow gap-1 px-1 font-semibold capitalize",
    header: "flex items-center justify-between gap-0.5",
    table: "mt-3",
    thead: "flex",
    tbody: "flex flex-col gap-0.5",
    headcell: "w-8 flex-1 pb-1 text-sm font-normal text-fg-secondary",
    celltrigger: "size-8 text-sm data-selected:!bg-bg-tertiary data-today:bg-bg-accent data-today:!text-light",
    tr: "flex gap-0.5",
  },
});

export default styles;
