'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
  meta?: string;
  highlight?: boolean;
}

interface CustomSelectProps {
  id?: string;
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder = 'اختر من القائمة',
  searchable = false,
  searchPlaceholder = 'ابحث...',
  error,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const controlId = id || generatedId;
  const listboxId = `${controlId}-listbox`;

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable && query.trim()
    ? options.filter(
        (opt) =>
          opt.label.includes(query.trim()) ||
          (opt.meta && opt.meta.includes(query.trim()))
      )
    : options;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable) {
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 20);
    }
    if (isOpen) {
      const idx = filteredOptions.findIndex((o) => o.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    setQuery('');
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredOptions.length ? (prev + 1) % filteredOptions.length : -1
        );
      }
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredOptions.length
          ? (prev - 1 + filteredOptions.length) % filteredOptions.length
          : -1
      );
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label
          htmlFor={controlId}
          className="block text-xs font-semibold text-[#17251F] mb-1.5"
        >
          {label} {required && <span className="text-[#245745]">*</span>}
        </label>
      )}

      <button
        id={controlId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border bg-[#FAF8F3] px-3.5 py-3 text-sm text-start transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#245745]/20 ${
          isOpen
            ? 'border-[#245745]'
            : error
            ? 'border-red-600/60'
            : 'border-[#17251F]/15 hover:border-[#245745]/50'
        }`}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-[#68776E] shrink-0">{icon}</span>}
          <span
            className={`truncate ${
              selectedOption ? 'text-[#17251F] font-medium' : 'text-[#68776E]/80'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <span className="flex items-center gap-2 shrink-0">
          {selectedOption?.meta && (
            <span
              className={`hidden sm:inline text-[11px] ${
                selectedOption.highlight ? 'text-[#245745] font-medium' : 'text-[#68776E]'
              }`}
            >
              {selectedOption.meta}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[#68776E] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#245745]' : ''
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-40 mt-2 w-full rounded-2xl border border-[#17251F]/15 bg-[#FAF8F3] shadow-lg overflow-hidden"
        >
          {searchable && (
            <div className="p-2 border-b border-[#17251F]/10 bg-[#EFEADC]/35">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-[#68776E] absolute right-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setActiveIndex((prev) =>
                        filteredOptions.length ? (prev + 1) % filteredOptions.length : -1
                      );
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setActiveIndex((prev) =>
                        filteredOptions.length
                          ? (prev - 1 + filteredOptions.length) % filteredOptions.length
                          : -1
                      );
                    } else if (e.key === 'Enter' && activeIndex >= 0 && filteredOptions[activeIndex]) {
                      e.preventDefault();
                      handleSelect(filteredOptions[activeIndex].value);
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-lg border border-[#17251F]/12 bg-[#FAF8F3] pr-8 pl-3 py-2 text-xs text-[#17251F] placeholder:text-[#68776E] focus:outline-none focus:border-[#245745]"
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto p-1.5 divide-y divide-[#17251F]/5">
            {filteredOptions.length === 0 ? (
              <p className="py-4 px-3 text-center text-xs text-[#68776E]">
                لا توجد نتائج مطابقة
              </p>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#245745]/10 text-[#245745] font-semibold'
                        : isActive
                        ? 'bg-[#EFEADC]/70 text-[#17251F]'
                        : 'text-[#17251F] hover:bg-[#EFEADC]/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block truncate">{opt.label}</span>
                      {opt.meta && (
                        <span
                          className={`block text-[11px] mt-0.5 ${
                            opt.highlight ? 'text-[#245745]' : 'text-[#68776E]'
                          }`}
                        >
                          {opt.meta}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#245745] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
