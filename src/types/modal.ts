import React from "react";

export interface IUseModal {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  onOutsideClick(e: MouseEvent | TouchEvent): void;
}
