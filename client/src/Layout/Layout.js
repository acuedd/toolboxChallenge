import React from 'react';

import './Layout.css';


const Layout = props => {
    console.log(props)
    const {header, lines, title} = props

    return (
        <div className="ToolBoxApp">
            <div>
                <h1>{title}</h1>
            </div>
            <div className='mcontent'>
                <table>
                    <thead>
                        <tr>
                            {header.map((val, key) => {
                                return (                    
                                    <th>{val}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map((item) =>{
                            return (
                                <tr>
                                    <td>{item[header[0]]}</td>
                                    <td>{item[header[1]]}</td>
                                    <td>{item[header[2]]}</td>
                                    <td>{item[header[3]]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Layout;