import * as Dialog from "@radix-ui/react-dialog";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <Dialog.Root>
        <Dialog.Trigger className="px-4 py-2 bg-blue-500 text-white rounded">
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow">
            <Dialog.Title className="font-bold">Hello Radix</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm">
              If you can see this, Radix is wired up correctly.
            </Dialog.Description>
            <Dialog.Close className="mt-4 px-3 py-1 bg-gray-200 rounded">
              Close
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}