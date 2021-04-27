import React from 'react';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import './index.css';

const tagifySettings = {
  maxTags: 3,
  placeholder: 'Tag genres',
};

/**
 * Tagify wrapper to choose tags
 * @returns React component
 */
const TagsSelector = React.forwardRef((props, ref) => {
  const handleTagifyChange = e => {
    try {
      if (e.detail.value !== '') {
        ref.current = JSON.parse(e.detail.value);
      } else {
        ref.current = [];
      }
    } catch (err) {
      console.log('Error', err.message);
    }
  };

  return (
    <>
      <Tags
        className="customLook"
        settings={tagifySettings} // tagify settings object
        onChange={handleTagifyChange}
      />
    </>
  );
});

TagsSelector.displayName = 'TagsSelector';

export default TagsSelector;
