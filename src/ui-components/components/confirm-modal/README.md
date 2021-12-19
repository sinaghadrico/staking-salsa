# Usage

```sh
import { ConfirmModal } from 'ui-components'

      <button onClick={() => setOpen(true)}>show</button>

      <ConfirmModal
        description={description}
        width="40"
        iconComponent={_image}
        open={open}
        onClose={() => setOpen(false)}
        confirmTitle="Try again"
        cancelTitle="Edit"
      >
        <p>body</p>
      </ConfirmModal>

```
