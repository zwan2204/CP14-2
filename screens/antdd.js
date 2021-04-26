// import { Input } from 'antd';

// const { TextArea } = Input;

// const onChange = e => {
//   console.log('Change:', e.target.value);
// };

// ReactDOM.render(<TextArea showCount maxLength={100} onChange={onChange} />, mountNode);

import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const Antdd = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Antdd;