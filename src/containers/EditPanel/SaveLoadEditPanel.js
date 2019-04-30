import { connect } from 'react-redux';

import { loadPuzzle } from '../../actions/saveLoadEditActions';

import SaveLoadEditForm from '../../components/EditForm/SaveLoadEditForm';

const mapStateToProps = state => ({
    getContent: () => JSON.stringify(state.puzzle),
});

const mapDispatchToProps = {
    onContentLoaded: loadPuzzle
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveLoadEditForm);
