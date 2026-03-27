import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const PasswordField = ({ label, value, show, onShow, onChange, onBlur, error, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-text-subtle block">{label}</label>
    <div className="relative group">
      <MdLock className={`absolute right-3 top-1/2 -translate-y-1/2 text-xl transition-colors ${
        error ? 'text-red-text' : 'text-text-subtle group-focus-within:text-primary'
      }`} />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full rounded-xl border ${
          error ? 'border-red-text' : 'border-border-warm'
        } bg-bg-subtle py-3 pr-10 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text-main`}
        dir="ltr"
      />
      <button type="button" onClick={onShow}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-colors">
        {show ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
      </button>
    </div>
    {error && (
      <p className="text-red-text text-xs bg-red-soft p-2 rounded-lg border border-red-200">{error}</p>
    )}
  </div>
);

export default PasswordField;