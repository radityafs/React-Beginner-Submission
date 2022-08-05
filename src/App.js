/* eslint-disable react-hooks/exhaustive-deps */

import Header from './components/Header';
import { Tab, Tabs } from 'react-bootstrap';
import { getInitialData, isArchived } from './utils';
import React, { useEffect, useState } from 'react';
import Content from './components/Content';
import ModalComp from './atoms/ModalComp';

function App() {
  const [navTab, setNavTab] = useState('active');
  const [data, setData] = useState(getInitialData());
  const [filteredData, setFilteredData] = useState(getInitialData());

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const filterData = (search) => {
    if (search.length > 0) {
      setFilteredData(
        data.filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.body.toLowerCase().includes(search.toLowerCase())
        )
      );
      return;
    }

    setFilteredData(data);
  };

  /**
   * Data Consistency
   */
  useEffect(() => {
    filterData(search);
  }, [data]);

  useEffect(() => {
    filterData(search);
  }, [search]);

  /**
   * Archive/Unarchive Data
   * Delete Data
   */

  useEffect(() => {
    let newData = [...data];

    if (selectedData?.action) {
      if (selectedData?.action === 'Archive') {
        newData = newData.map((item) => {
          if (item.id === selectedData?.data?.id) {
            item.archived = !item.archived;
          }

          return item;
        });

        setData(newData);
        return;
      }

      if (selectedData?.action === 'Delete') {
        newData = newData.filter(
          (item) => !(item.id === selectedData?.data?.id)
        );
        setData(newData);

        return;
      }
      setShowModal(true);
    }
  }, [selectedData]);

  /**
   * Add Data
   * Edit Data
   */
  const modalSubmit = (dataModal) => {
    let newData = [...data];

    if (dataModal?.action === 'Add') {
      newData.push(dataModal.data);
    } else if (dataModal?.action === 'Edit') {
      newData = newData.map((item) => {
        if (item.id === dataModal?.data?.id) {
          item.title = dataModal?.data?.title;
          item.body = dataModal?.data?.body;
        }

        return item;
      });
    }

    setData(newData);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <Tabs
          activeKey={navTab}
          onSelect={(e) => setNavTab(e)}
          className='mb-3'
        >
          <Tab eventKey='active' title='Active'>
            <div className='todo-header'>
              <div
                className='btn btn-primary'
                onClick={() => {
                  setShowModal(true);
                  setSelectedData({ action: 'Add' });
                }}
              >
                <div className='icon-plus'></div>
                Tambah
              </div>
            </div>

            <input
              type='text'
              placeholder='Find your note...'
              className='search-todo'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Content
              data={isArchived(filteredData)}
              action={(data) => setSelectedData(data)}
            />
          </Tab>

          <Tab eventKey='archive' title='Archive'>
            <input
              type='text'
              placeholder='Find your note...'
              className='search-todo mt-4'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Content
              data={isArchived(filteredData, true)}
              action={(data) => setSelectedData(data)}
            />
          </Tab>
        </Tabs>

        <ModalComp
          isShow={showModal}
          onCloseModal={() => setShowModal(false)}
          data={selectedData}
          onSubmitModal={(data) => modalSubmit(data)}
        />
      </div>
    </>
  );
}

export default App;
