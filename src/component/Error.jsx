import React from 'react'

function Error() {
    return (
        <div className="main">
            <div className="up">
                <h2>
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </h2>
                <div className="fire">Page not found</div>
                <img
                    src="https://i.postimg.cc/j2PcZK27/superman-04.png"
                    alt=""
                    width={200}
                    className="super"
                />
            </div>
            <div className="down">
                <div className="content">
                    <h4>Oops..look like you got lost</h4>
                    <a href="#">Go Home</a>
                </div>
            </div>
        </div>

    )
}

export default Error
