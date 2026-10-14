"use client";

import React, { useId, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";

export interface DropdownNavItem {
  id: string;
  label: string;
  active?: boolean;
  onSelect: () => void;
  subMenus?: {
    title: string;
    items: {
      id: string;
      label: string;
      description?: string;
      icon: LucideIcon;
      onSelect: () => void;
    }[];
  }[];
}

interface Props {
  navItems: DropdownNavItem[];
  openMenu: string | null;
  onOpenMenu: (id: string) => void;
  onLeaveMenu: () => void;
  onCloseMenu: () => void;
}

// Adapted from the supplied dropdown demo for the site's fixed header and routing.
export function DropdownNavigation({ navItems, openMenu, onOpenMenu, onLeaveMenu, onCloseMenu }: Props) {
  const groupId = useId();
  const navRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const focusTrigger = (id: string) => navRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${id}"]`)?.focus();
  const openWithKeyboard = (id: string) => {
    onOpenMenu(id);
    requestAnimationFrame(() => navRef.current?.querySelector<HTMLButtonElement>(`[data-panel="${id}"] button`)?.focus());
  };

  return (
    <LayoutGroup id={groupId}>
      <nav ref={navRef} className="hidden lg:flex items-center mx-auto" aria-label="Main navigation">
        <ul className="relative flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item, index) => {
            const isOpen = openMenu === item.id;
            const hasChildren = Boolean(item.subMenus?.length);
            const panelId = `${groupId}-${item.id}-panel`;
            return (
              <li
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => hasChildren && onOpenMenu(item.id)}
                onMouseLeave={onLeaveMenu}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onCloseMenu();
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.stopPropagation();
                    onCloseMenu();
                    focusTrigger(item.id);
                  }
                  if (hasChildren && event.key === "ArrowDown" && !(event.target as HTMLElement).closest('[data-panel]')) {
                    event.preventDefault();
                    openWithKeyboard(item.id);
                  }
                }}
              >
                <div className={`relative flex items-center rounded-full transition-colors ${item.active || isOpen ? "text-white" : "text-gray-300 hover:text-white"}`}>
                  {(isOpen || item.active) && (
                    <motion.div
                      layoutId={isOpen ? "hover-bg" : undefined}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full border border-purple-400/25 bg-purple-500/15"
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={item.onSelect}
                    aria-current={item.active ? "page" : undefined}
                    className="relative rounded-full py-2.5 pl-3 pr-1 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 xl:pl-4 xl:text-sm"
                  >
                    {item.label}
                  </button>
                  {hasChildren && (
                    <button
                      type="button"
                      data-trigger={item.id}
                      aria-label={`${item.label} sections`}
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      onClick={() => isOpen ? onCloseMenu() : onOpenMenu(item.id)}
                      className="relative rounded-full py-3 pl-1 pr-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"
                    >
                      <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180 text-purple-300" : ""}`} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {isOpen && hasChildren && (
                    <motion.div
                      key={item.id}
                      id={panelId}
                      data-panel={item.id}
                      className={`absolute top-full z-50 pt-2 ${index >= navItems.length - 2 ? "right-0" : "left-0"}`}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : 4 }}
                      transition={{ duration: reducedMotion ? 0 : 0.15 }}
                    >
                      <motion.div
                        layoutId={reducedMotion ? undefined : "menu"}
                        className="flex max-h-[70dvh] w-max max-w-[calc(100vw-3rem)] gap-7 overflow-y-auto rounded-2xl border border-purple-400/25 bg-[#10091f]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      >
                        {item.subMenus?.map(sub => (
                          <div key={sub.title} className="w-72 max-w-full">
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-purple-300">{sub.title}</h3>
                            <ul className="space-y-2">
                              {sub.items.map(child => {
                                const Icon = child.icon;
                                return (
                                  <li key={child.id}>
                                    <button type="button" onClick={child.onSelect} className="group flex w-full items-start gap-3 rounded-xl p-2 text-left transition-colors hover:bg-purple-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300">
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-300/15 bg-white/[0.03] text-purple-300 transition-colors group-hover:bg-purple-500/20"><Icon aria-hidden="true" className="h-4 w-4" /></span>
                                      <span className="min-w-0 leading-5">
                                        <span className="block text-sm font-medium text-white">{child.label}</span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-gray-400 group-hover:text-purple-200">{child.description}</span>
                                      </span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
}
