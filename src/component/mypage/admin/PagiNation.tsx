import React from 'react';

interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}
const PagiNation: React.FC<Props> = (props: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => props.paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PagiNation;
