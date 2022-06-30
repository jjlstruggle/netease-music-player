import { useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
export default function useHistory() {
  const $location = useLocation();
  const type = useNavigationType();
  const stack = useRef([]);
  const typeStack = useRef([]);
  switch (type) {
    case "POP":
      stack.current.pop();
      typeStack.current.push("pop");
      break;
    case "PUSH":
      stack.current.push($location);
      typeStack.current.push("push");
      break;
    case "REPLACE":
      stack.current[stack.current.length - 1] = $location;
      typeStack.current.push("replace");
      break;
  }
  return { stack: stack.current, type: typeStack.current };
}
