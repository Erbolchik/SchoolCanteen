using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using SchoolСanteen.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolСanteen.Controllers.Foods
{
    public class FoodsRequest
    {
        [JsonProperty(PropertyName = "file")]
        public IFormFile File { get; set; }

        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        public Food Food { get; set; }
    }

    public class FormDataJsonBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            string fieldName = bindingContext.FieldName;
            var valueProviderResult = bindingContext.ValueProvider.GetValue(fieldName);

            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else
            {
                bindingContext.ModelState.SetModelValue(fieldName, valueProviderResult);
            }

            string value = valueProviderResult.FirstValue;
            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }

            try
            {
                object result = JsonConvert.DeserializeObject(value, bindingContext.ModelType);
                bindingContext.Result = ModelBindingResult.Success(result);
            }
            catch (JsonException)
            {
                bindingContext.Result = ModelBindingResult.Failed();
            }

            return Task.CompletedTask;
        }
    }
}


