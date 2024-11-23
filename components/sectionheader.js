import React from "react";
import PropTypes from "prop-types";

const SectionHeader = ({
  title,
  toggleable,
  section,
  onToggle,
  expandedSections,
}) => (
  <div className="relative border-b border-neutral-200 dark:border-neutral-700 mb-4">
    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 text-center pb-2">
      {title}
    </h2>
    {toggleable && (
      <button
        onClick={() => onToggle(section)}
        className="absolute right-0 top-0 text-neutral-700 hover:text-primary-500 transition-colors"
      >
        {expandedSections[section] ? "−" : "+"}
      </button>
    )}
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  toggleable: PropTypes.bool,
  section: PropTypes.string,
  onToggle: PropTypes.func,
  expandedSections: PropTypes.object,
};

SectionHeader.defaultProps = {
  toggleable: false,
  section: "",
  onToggle: () => {},
  expandedSections: {},
};

export default SectionHeader;
