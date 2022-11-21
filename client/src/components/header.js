import React, {useState} from "react";
import {Button, Dropdown, Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function header({title, residences, buttonText, buttonFn,
	                sortBy, currentSort, sortList,
	                pageNav, currentPage, pageCount}) {
	
	const filterStyle = {
		background: "var(--primary-color)",
		margin: "20px 0 0 0",
		padding: "10px",
		width: "min-content",
		borderRadius: "10px",
		display: "flex"
	};
	
	const buttonStyle = {
		float: 'right',
	}
	
	
	const navigate = useNavigate();
	const pageNums = [];
	for (let number = 1; number <= pageCount; number++) {
		pageNums.push(
			<Pagination.Item onClick={()=>pageNav(number)} key={number} active={number === currentPage}>
				{number}
			</Pagination.Item>,
		);
	}
	
	return (
		<div className="custom-header shadow-lg">
			<Button style={buttonStyle} variant={"secondary"} onClick={buttonFn}>
				{buttonText}
			</Button>
			<h2>{title}</h2><br/>
			
			{
				residences.map(r => {
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
						{sortList[currentSort]}
					</Dropdown.Toggle>
					
					<Dropdown.Menu>
						{
							sortList.map((f, i) => {
								return (
									<Dropdown.Item onClick={() => sortBy(i)}>{f}</Dropdown.Item>
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