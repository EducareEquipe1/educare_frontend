import React from 'react'

const OneArchive = () => {
  return (
    <div className="text-[13px] w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between p-2">
        <span className="capitalize w-1/2 sm:w-[150px]">{matricule}</span>
        <span className="capitalize w-1/2 sm:w-[150px]">
          {first_name} {last_name}
        </span>
        <span className="w-1/2 sm:w-[200px] truncate">{email}</span>
        <span className="w-1/2 sm:w-[120px]">{role}</span>
        <span
          className={`w-1/2 sm:w-[100px] ${
            is_active ? "text-green-600" : "text-red-600"
          }`}
        >
          {is_active ? "Active" : "Inactive"}
        </span>
        <div className="p-1">
          <button
            className="border border-[#929A9B] text-[13px] px-2 py-1 hover:bg-[#679294] hover:text-white cursor-pointer rounded"
            onClick={() => {
              setActionType("archiver");
              setShowConfirmation(true);
            }}
          >
            Archiver
          </button>
          <button
            className="ml-2 border border-[#929A9B] text-[13px] px-2 py-1 hover:bg-[#679294] hover:text-white cursor-pointer rounded"
            onClick={() => {
              setActionType("modifier");
              setShowConfirmation(true);
            }}
          >
            Modifier
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-[#BBBBBF] w-full" />

      {showConfirmation && (
        <Confirmation
          type={actionType}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}

export default OneArchive
