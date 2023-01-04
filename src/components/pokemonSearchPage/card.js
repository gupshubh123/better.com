import React from "react";
/**
 * 
 * card component takes in Title (name) and list of data to be rendered
 * this makes this highly scalable for any kind of card data
 */
const Card = ({ cardData }) =>{
    const { name, cardImage, listData } = cardData
    /**
     * 
     * @param {*} list 
     * @param {*} name 
     * @returns jsx for list 
     */
    const renderDataItem = (list, name) =>{
        return(
          <>
            {list.length>0?(
                <div className='dataItem' role="article">
                <div className='dataItemName'>
                    {name} : &nbsp;
                </div>
                <div className='dataItemValues'>
                    {list.map((item, index) =>(
                    <>
                        <a target="_blank"  className="dataValue" href={item.url} role="link">{item.name}</a>
                        {index < list.length-1 ? ', ':''}
                    </>
                    ))}  
                </div>
                </div>
            ):null}
          </>  
        
        )
      }
    return (
        <section className='cardWrapper'>
            <div className='detailCard'>
            <div className='imageContainer'>
                <img src = {cardImage} alt="image" className='imgItem' role="img" aria-label="Image of pokemon"/>
            </div>
            <div className='textDetails'>
                <div className='title'>{name}</div>  
                <div className='listData'>
                    {listData.map(item=>(<>{renderDataItem(item.list, item.name)}</>))}
                </div>
            </div>
            </div>
        </section>
    )
}

export default React.memo(Card);