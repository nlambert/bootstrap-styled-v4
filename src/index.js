import HeaderNavBar, { compCollapse, compSlide, compPush } from './components/HeaderNavBar';

const mixins = require('./mixins');
const utilities = require('./utilities');

// 0. Configuration
export { default as theme } from './config';
// 1. Atoms
export { default as A, composeLink } from './components/A';
export { default as Abbr } from './components/Abbr';
export { default as Address } from './components/Address';
export { default as Alert } from './components/Alert';
export { default as Area } from './components/Area';
export { default as Article } from './components/Article';
export { default as Blockquote } from './components/Blockquote';
export { default as Breadcrumb } from './components/Breadcrumb';
export { default as Button } from './components/Button';
export { default as ButtonGroup } from './components/ButtonGroup';
export { default as Caption } from './components/Caption';
export { default as Clearfix } from './components/Clearfix';
export { default as Close } from './components/Close';
export { default as Code } from './components/Code';
export { default as Col } from './components/Col';
export { default as Dd } from './components/Dd';
export { default as Details } from './components/Details';
export { default as Dl } from './components/Dl';
export { default as Dt } from './components/Dt';
export { default as Fieldset } from './components/Fieldset';
export { default as Figure } from './components/Figure';
export { default as Footer } from './components/Footer';
export { default as Form } from './components/Form';
export { default as H1 } from './components/H1';
export { default as H2 } from './components/H2';
export { default as H3 } from './components/H3';
export { default as H4 } from './components/H4';
export { default as H5 } from './components/H5';
export { default as H6 } from './components/H6';
export { default as Header } from './components/Header';
export { default as Hr } from './components/Hr';
export { default as Img } from './components/Img';
export { default as Input } from './components/Input';
export { default as InputGroup } from './components/InputGroup';
export { default as IssueIcon } from './components/IssueIcon';
export { default as Kbd } from './components/Kbd';
export { default as Jumbotron } from './components/Jumbotron';
export { default as Label } from './components/Label';
export { default as Legend } from './components/Legend';
export { default as Li } from './components/Li';
export { default as ListGroup } from './components/ListGroup';
export { default as Map } from './components/Map';
export { default as Mark } from './components/Mark';
export { default as Nav } from './components/Nav';
export { default as Ol } from './components/Ol';
export { default as Option } from './components/Option';
export { default as Output } from './components/Output';
export { default as P } from './components/P';
export { default as Pagination } from './components/Pagination';
export { default as Pre } from './components/Pre';
export { default as Progress } from './components/Progress';
export { default as Row } from './components/Row';
export { default as Section } from './components/Section';
export { default as Select } from './components/Select';
export { default as Small } from './components/Small';
export { default as Summary } from './components/Summary';
export { default as Table } from './components/Table';
export { default as Tag } from './components/Tag';
export { default as Tbody } from './components/Tbody';
export { default as Td } from './components/Td';
export { default as Textarea } from './components/Textarea';
export { default as Tfoot } from './components/Tfoot';
export { default as Th } from './components/Th';
export { default as Thead } from './components/Thead';
export { default as Tr } from './components/Tr';
export { default as Ul } from './components/Ul';
// 2. Molecules
export { default as Card } from './components/Card';
export { default as CardColumns } from './components/CardColumns';
export { default as CardDeck } from './components/CardDeck';
export { default as CardGroup } from './components/CardGroup';
export { default as DropDown } from './components/DropDown';
export { default as NavBar } from './components/NavBar';
// 3. Organisms
export { default as Container } from './components/Container';
export { default as ContainerFluid } from './components/ContainerFluid';
// 3.1. Create HeaderNavBar type
const HeaderNavBarCollapse = compCollapse(HeaderNavBar);
const HeaderNavBarSlide = compSlide(HeaderNavBar);
const HeaderNavBarPush = compPush(HeaderNavBar);
// 3.2 Export HeaderNavBar
export { HeaderNavBar, HeaderNavBarCollapse, HeaderNavBarPush, HeaderNavBarSlide };
// 4. Templates
export { default as DocBootstrap } from './components/DocBootstrap';

// 5. Mixins et Utilities exported in global export default and suffixed
Object.keys(mixins).forEach((key) => { module.exports[`${key}Mixins`] = mixins[key]; });
Object.keys(utilities).forEach((key) => { module.exports[`${key}Utils`] = utilities[key]; });
