

export function useTree() {
    /****************************************************************************/
    /*                             METHODS                                      */
    /****************************************************************************/
  
    const findChildTreeByColumn = (tree: Array<any>, column: string, value: any) : any => {
      return tree.find((el) => {
        if (el[column] == value) return el;
        else if (el.children?.length > 0) {
          return findChildTreeByColumn(el.children, column, value); 
        }
      });
    };
  
    const findChildTree = (tree: Array<any>, node: any) : any => {
      return tree.find(el => {
        if (el == node) return el;
        else if (el.children?.length > 0) {
          return findChildTree(el.children, node); 
        }
      });
    };
  
    const treeToArray = (tree: Array<any>, result?: Array<any>) : Array<any> => {
      const resultArray = result || [];
      tree.forEach(node => {
        resultArray.push(node);
        result = [...resultArray, treeToArray(node.children || [], resultArray)];
      });
      return resultArray;
    }

    const arrayToTree = (arr: Array<any>, parent: any = null): Array<any> => {
      return arr.filter((item: any) => item.parent === parent)
        .map((child: any) => ({ ...child, children: arrayToTree(arr, child.id) }));
    }
  
    return { findChildTreeByColumn, findChildTree, treeToArray, arrayToTree }
  }