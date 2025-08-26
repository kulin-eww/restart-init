import { TextField } from '@mui/material';

const ContactUsHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-bold mb-2">Contact Us</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <hr />
    </>
  )
}

export default ContactUsHeader
