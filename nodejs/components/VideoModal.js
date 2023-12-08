import React from 'react';
import YouTube from 'react-youtube';

function VideoModal({ showModal, handleClose, selectedVideo }) {
  return (
    showModal ? (
      <div className="fixed mt-8 z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:w-3/4 sm:h-3/4 m-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Video Player
                  </h3>
                  <div className="mt-2">
                    <div className="mt-2">
                      {selectedVideo && (
                        <YouTube videoId={selectedVideo.split('/').pop()} className="mx-auto"/>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
    focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default VideoModal;