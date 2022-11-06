import React from "react";
import {Dropdown, Pagination} from "react-bootstrap";

function header({title, residences}) {
	const filterStyle = {
		background: "var(--primary-color)",
		margin: "20px 0 0 0",
		padding: "10px",
		width: "min-content",
		borderRadius: "10px",
		display: "flex"
	};
	
	const filters = ['Newest', 'Oldest', 'Lowest Price', 'Highest Price'];
	
	const activePage = 1;
	const pageNums = [];
	for (let number = 1; number <= 5; number++) {
		pageNums.push(
			<Pagination.Item key={number} active={number === activePage}>
				{number}
			</Pagination.Item>,
		);
	}
	
	return (
		<div className="custom-header shadow">
			<h2>{title}</h2><br/>
			{
				Object.entries(residences).map(([k, r]) => {
					if (r.selected)
						return (<div className="custom-tags shadow">
							{r.fullName}
						</div>)
				})
			}
			
			<div className="shadow" style={filterStyle}>
				<Pagination className={'my-auto me-4'}>
					{pageNums}
				</Pagination>
				
				<Dropdown>
					<Dropdown.Toggle variant="secondary" id="filter-dropdown">
						Newest
					</Dropdown.Toggle>
					
					<Dropdown.Menu>
						{
							filters.map((f) => {
								return (
									<Dropdown.Item href="#/action-1">{f}</Dropdown.Item>
								)
							})
						}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	)
}

export default header;