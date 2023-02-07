import React from 'react';

type CategoriesProps = { value: number; onChangeCategory: (i: number) => void };

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, i) => (
          <li key={obj} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
