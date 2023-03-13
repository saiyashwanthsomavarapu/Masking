import { makeStyles } from "@material-ui/core/styles";

const handleSize = 8;
export const useStyles = makeStyles(() => ({
    deleteButton: {
        display: 'none',
        '&:hover':{
            display: 'inline-block'
        }
    },
    drawMaskBox: {
        position: 'absolute',
        border: '1px solid #FF0000',
        outline: '2px solid #FF0000',
        cursor: (props) => props?.readOnly ? '' : 'move',
        zIndex: 1,
        '&:hover button': {
            display: 'inline-block'
        }
    },
    imageNotFound: {
        zIndex: 5,
        backgroundColor: "white",
        paddingTop: '10%',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        fontSize: "13px"
    },
    resizeHandleSE: {
        position: 'absolute',
        bottom: -1 * handleSize/2,
        right: -1 * handleSize/2,
        width: handleSize,
        height: handleSize,
        outline: '1px solid rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        cursor: 'se-resize'
    },
    resizeHandleSW: {
        position: 'absolute',
        bottom: -1 * handleSize/2,
        left: -1 * handleSize/2,
        width: handleSize,
        height: handleSize,
        outline: '1px solid rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        cursor: 'sw-resize'
    },
    resizeHandleNW: {
        position: 'absolute',
        top: -1 * handleSize/2,
        left: -1 * handleSize/2,
        width: handleSize,
        height: handleSize,
        outline: '1px solid rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        cursor: 'nw-resize'
    },
    resizeHandleNE: {
        position: 'absolute',
        top: -1 * handleSize/2,
        right: -1 * handleSize/2,
        width: handleSize,
        height: handleSize,
        outline: '1px solid rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        cursor: 'ne-resize'
    },
    container: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        border: '1px solid rgba(203, 203, 203, 0.1)'
    },
    countMaks: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 5,
        padding: 5,
        background: '#fff',
        border: '1px solid #707070',
        zIndex: 3
    },
    saveMaks: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 5,
        padding: 5,
        background: '#fff',
        border: '1px solid #707070',
        zIndex: 3
    },
    localStyle: {
        width: (props) => `${props?.rect?.[props?.returnType?.width]}%`,
        height: (props) => `${props?.rect?.[props?.returnType?.height]}%`,
        left: (props) => `${props?.rect?.[props?.returnType?.x]}%`,
        top: (props) => `${props?.rect?.[props?.returnType?.y]}%`
    }
}))