import { DateTimePicker } from '../../datetime-picker';
import { FormControl, FormItem, FormMessage } from '@writeme/wmc/lib/ui/form';
import AutoFormLabel from '../common/label';
import AutoFormTooltip from '../common/tooltip';
import { AutoFormInputComponentProps } from '../types';

export default function AutoFormDateTime({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel
        label={fieldConfigItem?.label || label}
        isRequired={isRequired}
      />
      <FormControl>
        <DateTimePicker
          onChange={field.onChange}
          className="w-72"
          value={field.value}
          {...fieldProps}
        />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />

      <FormMessage />
    </FormItem>
  );
}
