import React from "react";

const Card = ({ cardData }) =>{
    const { name, cardImage, listData } = cardData
    const renderDataItem = (list, name) =>{
        return(
          <div className='dataItem'>
            <div className='dataItemName'>
              {name} : &nbsp;
            </div>
            <div className='dataItemValues'>
              {list.map((item, index) =>(
                <>
                  <a target="_blank"  className="dataValue" href={item.url}>{item.name}</a>
                  {index < list.length-1 ? ', ':''}
                </>
              ))}  
            </div>
          </div>
        )
      }
    return (
        <div className='cardWrapper'>
            <div className='detailCard'>
            <div className='imageContainer'>
                <img src = {cardImage} alt="image" className='imgItem'/>
            </div>
            <div className='textDetails'>
                <div className='title'>{name}</div>  
                <div className='listData'>
                    {listData.map(item=>(<>{renderDataItem(item.list, item.name)}</>))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default React.memo(Card);